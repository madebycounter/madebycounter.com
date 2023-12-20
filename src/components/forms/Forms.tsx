import React, { FormEvent } from "react";
import styled, { css } from "styled-components";

export const FormSplit = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 0.5rem;

    > * {
        flex: 1;
    }
`;

export const FormWrapper = styled.form`
    display: grid;
    gap: 0.5rem;
`;

export const FormInput = styled.input`
    width: calc(100% - 1rem - 4px);
    font-size: 1rem;
    padding: 0.5rem;

    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.fonts.body};

    border: 2px solid ${(props) => props.theme.color};
    border-radius: 0;
`;

export const FormTextArea = styled.textarea`
    width: calc(100% - 1rem - 4px);
    font-size: 1rem;
    padding: 0.5rem;

    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.fonts.body};

    border: 2px solid ${(props) => props.theme.color};
    border-radius: 0;

    resize: none;
`;

type AcceptsLoading = {
    $loading?: boolean;
};

export const FormButton = styled.button<AcceptsLoading>`
    position: relative;
    font-size: 1rem;
    padding: 0.3rem 1rem;
    float: right;

    cursor: pointer;

    background-color: ${(props) => props.theme.color};
    color: ${(props) => props.theme.backgroundColor};
    font-family: ${(props) => props.theme.fonts.body};

    border: 2px solid ${(props) => props.theme.color};

    ${(props) =>
        props.$loading &&
        css`
            padding-right: 2em;
        `}

    transition: padding-right 0.2s ease-in-out;
`;

const FormSubmitSpinner = styled.span<AcceptsLoading>`
    right: 1.8em;
    top: 0.4em;
    display: block;
    position: absolute;

    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    ${(props) =>
        props.$loading &&
        css`
            opacity: 1;
        `}

    &:before {
        content: "";
        width: 0.5em; /* Size of the spinner */
        height: 0.5em; /* Change as desired */
        position: absolute;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        border: solid 0.2em #bbb; /* Thickness/color of spinner track */
        border-bottom-color: ${(props) =>
            props.theme.backgroundColor}; /* Color of spinner at full speed */
        animation: 0.8s linear infinite spinner; /* speed of spinner */
        transform: translate(-50%, -50%);
        will-change: transform;
        z-index: 100;
    }

    @keyframes spinner {
        0% {
            transform: rotate(0deg);
        }

        100% {
            transform: rotate(360deg);
        }
    }
`;

type FormSubmitProps = {
    children: React.ReactNode;
    loading?: boolean;
    className?: string;
    onClick?: () => void;
};

export function FormSubmit({
    children,
    loading = false,
    className,
}: FormSubmitProps) {
    console.log(loading);

    return (
        <div>
            <FormButton type="submit" className={className} $loading={loading}>
                {children}
                <FormSubmitSpinner $loading={loading} />
            </FormButton>
        </div>
    );
}

type FormProps = {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    className?: string;
};

export function Form({
    onSubmit,
    className,
    children,
}: React.PropsWithChildren<FormProps>) {
    return (
        <FormWrapper
            onSubmit={(e: FormEvent<HTMLFormElement>) => {
                e.preventDefault();

                if (!e.currentTarget.checkValidity()) {
                    e.currentTarget.reportValidity();
                } else {
                    onSubmit(e);
                }
            }}
            className={className}
        >
            {children}
        </FormWrapper>
    );
}
