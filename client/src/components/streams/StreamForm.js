import React from 'react';
import { Field, reduxForm } from 'redux-form';


const renderInput = ({ input, label, meta }) => {

        const renderError = ({error, touched}) => {
            if (touched && error) {
                return (
                    <div className='ui error message'>
                        <div className='header'>{error}</div>
                    </div>
                );
            }
        }
        return (
            <div className='field'>
                <label>{ label }</label>
                <input {...input} autoComplete='off'/>
                {renderError(meta)}
            </div>
        );   
    }

const StreamForm = (props) => {

    
    const onSubmit = (formValues) => {
        props.onSubmit(formValues);
    }
    
    return (
        <form
            onSubmit={props.handleSubmit(onSubmit)} className='ui form error'>
                <Field
                    name="title" //name  je ime property-a* sa kojim radimo
                    component={renderInput}//vraca element koji ce biti pokazan na displeju
                    label="Enter Title"
                />
                <Field
                    name="description"
                    component={renderInput}
                    label="Enter Description"
            />   
            <button className='ui button primary'>Submit</button>
        </form>
    );
};

function validate(formValues){
    const errors = {};
    if (!formValues.title) {
        errors.title = 'You must enter a title';
    }

     if (!formValues.description) {
         errors.description = 'You must enter a description';
     }
    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
