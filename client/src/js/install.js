const butInstall = document.getElementById('buttonInstall');
let installPrompt = null;

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', async (event) => {
    event.preventDefault();
    installPrompt = event;
    butInstall.style.visibility = 'visible'; // If the PWA can still be installed, show it to the user
});

butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        console.log("Couldn't install PWA. Browser may not support it")
        return;
    }
    const result = await installPrompt.prompt();
    // console.log(`Install prompt was: ${result.outcome}`);
    
    if (result.outcome !== 'dismissed') {
        butInstall.setAttribute('disabled', true);
        installPrompt = null;
        butInstall.textContent = 'Installed!';
    }
});

window.addEventListener('appinstalled', (event) => {
    alert('Successfully installed!')
    console.log('👍', 'appinstalled', event);
});
