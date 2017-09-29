import * as React from "react";
import { render } from "react-dom";
import { ContentContainerComponent } from "./content-container-component";

export class NotificationContainer extends React.Component<any, any> {
    public constructor() {
        super();
        this.state = {
            notifications: []
        };
        updateNotificationState = this.setState.bind(this);
    }

    public render() {
        return <ContentContainerComponent>
                    {this.state.notifications.map((notification: any) => <div className="notification">{notification.message}</div>)} 
               </ContentContainerComponent>;
    }
}

let updateNotificationState: any;
const notifications: Array<any> = [];

const notificationContainer = document.createElement("div");
notificationContainer.id = "notification-container";
notificationContainer.className = "notification-container";
document.body.appendChild(notificationContainer);
render(<NotificationContainer />, document.getElementById("notification-container"));

export function notify(message: string) {
    const notification = { message };

    notifications.push(notification);

    updateNotificationState({
        notifications: notifications
    });

    setTimeout(() => {
        const index = notifications.indexOf(notification);
        notifications.splice(index, 1);

        updateNotificationState({
            notifications: notifications
        });
    }, 5000);
}

/*
async function setup() {
    return new Promise((resolve, reject) => {
        render(<AppComponent />, document.getElementById("notification-container"), resolve);
    });
}*/
