const FilterGroup = ({ title, inputType, options}) =>{

    return(
        <div>
            <h4>
                {title}
            </h4>
            {options.map((option, index) =>(
                <div key={index}>
                    <input type={inputType}
                    id={option.value || option.text}
                    name={title}
                    value={option.value || option.text} 
                    />
                <label htmlFor={option.value || option.text}>[
                    {option.text}
                </label>
                </div>
            ))}
        </div>
    )

}
