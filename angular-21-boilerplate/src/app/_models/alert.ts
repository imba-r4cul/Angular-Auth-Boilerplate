export class Alert {
    id?: string;
    type?: AlertType;
    message?: string;
    autoClose?: boolean;
    keepAfterRouteChange?: boolean;
    fade?: boolean;
}

export enum AlertType {
    Success,
    Error,
    Info,
    Warning
}
