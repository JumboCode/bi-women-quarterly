import React, {useState} from 'react'; 

interface ButtonProps {
    label: string; 
    onClick: () => void; 
}

// Input: props, Output: HTML that describes the UI 
// Button is a functional component with props of type ButtonProp 
// takes in a single argument, that is type object 
// { label } = extract label property from props 
const Button: React.FC<ButtonProps> = ( { label, onClick}) => {
    const [hovered, setHovered] = useState(false); 

    const buttonStyle = {
        border: '3px solid #F1E2F8', 
        borderRadius: '5px',
        padding: '10px 20px', 
        backgroundColor: hovered ? '#C4BFC6': '#D6AEEB', 
        color: 'white', 
        fontSize: '18px',
        cursor: 'pointer', 
        transition: 'background-color 0.3s'
    }; 

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    }; 

    return (
        <button style={buttonStyle}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={onClick}> 
            {label} 
        </button>
    );
};

export default Button; // connect to the full app