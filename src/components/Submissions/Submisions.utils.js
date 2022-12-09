import {TextArea, Input} from "components/CreateProject/helpers";
import Links from "components/CreateProject/Links";

const ITEM_COMPONENT = {
    INPUT: "input",
    TEXTAREA: "textarea",
    LINKS: "links",
};

export const config = [
    {
        name: "title",
        placeholder: "Enter submission title",
        label: "Title",
        type: "text",
        component: "input",
    },
    {
        name: "description",
        component: "textarea",
        rows: 6,
        placeholder: "Submission description",
        label: "Description",
        description: "Please describe your work",
    },
    {
        name: "links",
        component: "links",
        placeholder: "Submission links",
        label: "Links",
        description: "Please provide links to your work",
    },
];

export const renderSubmissionsComponent = (item, formik, idx) => {
    switch (item.component) {
        case ITEM_COMPONENT.INPUT:
            return renderItemComponent(item, formik, idx);
        case ITEM_COMPONENT.TEXTAREA:
            return renderTextAreaComponent(item, formik, idx);
        case ITEM_COMPONENT.LINKS:
            return renderLinkComponent(formik, idx);

        default:
            return;
    }
};

export const renderItemComponent = (item, formik, idx) => {
    console.log("===5", item, formik, idx);
    return (
        <Input
            {...item}
            key={idx}
            placeholder={item.placeholder}
            value={formik?.values[item.name]}
            name={item.name}
            onBlur={formik?.handleBlur}
            label={item.label}
            error={formik?.touched[item.name] && formik?.errors[item.name]}
            variant="xs"
            onChange={formik?.handleChange}
        />
    );
};

const renderTextAreaComponent = (item, formik, idx) => (
    <TextArea
        {...item}
        key={idx}
        placeholder={item.placeholder}
        value={formik.values[item.name]}
        onBlur={formik.handleBlur}
        name={item.name}
        error={formik.touched[item.name] && formik.errors[item.name]}
        label={item.label}
        onChange={formik.handleChange}
    />
);

const renderLinkComponent = (formik, idx) => {
    return (
        <Links
            key={idx}
            onChange={(links) => formik.setFieldValue("links", links)}
            values={formik.values.links}
        />
    );
};
