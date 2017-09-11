const serviceNavigator = navigator as any as { serviceWorker: ServiceWorkerContainer };

if (serviceNavigator.serviceWorker) {
    
    window.addEventListener("load", async () => {
        try {
            const registrations: Array<ServiceWorkerRegistration> = await serviceNavigator.serviceWorker.getRegistrations();

            const serviceWorkerUrl = location.origin + "/{{scripts.service-worker}}";

            registrations.forEach(registration => {
                if (registration.active.scriptURL !== serviceWorkerUrl) {
                    registration.unregister();
                }
            });

            if (registrations.filter(registration => registration.active.scriptURL === serviceWorkerUrl).length === 0) {
                const registration = await serviceNavigator.serviceWorker.register(serviceWorkerUrl);
            }
        }
        catch (error) {            
            console.log("ServiceWorker registration failed: ", error);
        }
    });
}
