import { Input } from 'react-daisyui';
import Form from 'react-bootstrap/Form';
import Feedback from 'react-bootstrap/Feedback';

const FormInput = ({ 
    id, type, value, setValue, feedbackMessage = "", isInvalid = false, customSetValue = false,
    onKeyDownFunction = () => {}, placeholder = "", required = false, bsPrefix = "", disabled = false
} ) => {
    return (
        <>
            <Form.Control 
                id={id}
                bsPrefix={'w-full text-lg ' + bsPrefix}
                as={Input}
                borderOffset={false}
                bordered
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={customSetValue ? (e) => customSetValue(e) : (e) => setValue(e.target.value)}
                onKeyDown={onKeyDownFunction}
                isInvalid={isInvalid}
                disabled={disabled}
                required={required} />
            <Feedback
                type='invalid'
                className='text-error'
                dangerouslySetInnerHTML={{ __html: feedbackMessage }} />
        </>
    )
}

export default FormInput