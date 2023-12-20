export type HubspotFormValue = {
    name: string;
    value: string;
};

export type HubspotFormContext = {
    pageUri: string;
    pageName: string;
};

export function submitHubspotForm(
    portalId: number | string,
    formGuid: string,
    data: HubspotFormValue[],
    context: HubspotFormContext,
) {
    var url = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formGuid}`;
    var options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            submittedAt: new Date().getTime(),
            fields: data,
            context: context,
        }),
    };

    return fetch(url, options).then((response) => response.json());
}
