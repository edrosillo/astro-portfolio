const form = document.getElementById("contact-form") as HTMLFormElement | null;
const statusDiv = document.getElementById("form-status");
const modal = document.getElementById("success-modal") as HTMLDialogElement | null;
const closeModalBtn = document.querySelector(".close-modal-btn");
const actionModalBtn = document.querySelector(".modal-action-btn");

if (modal) {
    const closeFn = () => {
        modal.close();
    };

    if (closeModalBtn) closeModalBtn.addEventListener("click", closeFn);
    if (actionModalBtn) actionModalBtn.addEventListener("click", closeFn);
    
    // Close on backdrop click
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });
}

if (form && statusDiv) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = new FormData(form);
        const turnstileToken = formData.get("cf-turnstile-response");

        if (!turnstileToken) {
            statusDiv.textContent = "Please complete the security check.";
            statusDiv.className = "form-status error";
            return;
        }

        statusDiv.textContent = "SENDING...";
        statusDiv.className = "form-status sending";

        try {
            const response = await fetch("/api/submit-contact", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (result.success) {
                statusDiv.textContent = "";
                statusDiv.className = "form-status";
                form.reset();
                if (modal && typeof modal.showModal === "function") {
                    modal.showModal();
                } else {
                    // Fallback
                    alert("MESSAGE SENT SUCCESSFULLY!");
                }
            } else {
                statusDiv.textContent =
                    "ERROR: " + (result.error || "UNKNOWN ERROR");
                statusDiv.className = "form-status error";
            }
        } catch (error) {
            statusDiv.textContent = "NETWORK ERROR. PLEASE TRY AGAIN.";
            statusDiv.className = "form-status error";
        }
    });
}
