import React, { useEffect } from "react";

import useSafeId from "../global/useSafeId";

type HubspotFormProps = {
    portalId: string;
    formId: string;
    onFormSubmit?: (form: any) => void;
};

export default function HubspotForm({
    portalId,
    formId,
    onFormSubmit,
}: HubspotFormProps) {
    const id = useSafeId();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://js.hsforms.net/forms/v2.js";
        document.body.appendChild(script);

        script.addEventListener("load", () => {
            // @ts-ignore
            if (window.hbspt) {
                // @ts-ignore
                window.hbspt.forms.create({
                    portalId: portalId,
                    formId: formId,
                    target: `#${id}`,
                    onFormSubmit: onFormSubmit,
                });
            }
        });
    }, [portalId, formId, id]);

    return (
        <div>
            <div id={id}></div>
        </div>
    );
}
