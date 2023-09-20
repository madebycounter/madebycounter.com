import { useId } from "react";

export default function useSafeId() {
    return useId().replaceAll(":", "_");
}
