// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenuBtn.classList.toggle('active');
  mobileMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
const mobileLinks = document.querySelectorAll('.mobile-menu a');
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenuBtn.classList.remove('active');
    mobileMenu.classList.remove('active');
  });
});

// Smooth scroll for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelector('#contato').scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Email form handling
document.getElementById('emailForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const email = document.getElementById('emailInput').value;
    const successMessage = document.getElementById('successMessage');
    const submitButton = this.querySelector('.submit-button');
    
    try {
        // Desabilitar o botão durante o envio
        submitButton.disabled = true;
        submitButton.textContent = 'Enviando...';
        
        // Enviar o email para o PHP
        const response = await fetch('save_email.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Mostrar mensagem de sucesso
            successMessage.style.display = 'block';
            document.getElementById('emailInput').value = '';
            
            // Esconder mensagem após 3 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 3000);
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('Error saving email:', error);
        alert('Ocorreu um erro ao salvar seu email. Por favor, tente novamente.');
    } finally {
        // Reabilitar o botão
        submitButton.disabled = false;
        submitButton.textContent = 'Enviar';
    }
}); 