import { modal } from "../stores/modal";

export function handleBinds(e: KeyboardEvent) {
    if (e.key === "Escape") {
        modal.set(null);
    }
}