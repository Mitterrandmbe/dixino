'use client';

import useCountries from "@/app/hooks/useCountries";
import Select from "react-select";

export type CountrySelectValue = {
    flag: string;
    label: string;
    latlng: number[];
    region: string;
    value: string;
    translations: string;
}

interface CountrySelectProps {
    value?: CountrySelectValue;
    onChange: (value: CountrySelectValue) => void;
    required?: boolean; 
}

const CountrySelect: React.FC<CountrySelectProps> = ({
    value,
    onChange,
    required
}) => {

    const { getAll } = useCountries();

  return (
    <div>
        <Select 
            placeholder="Pays"
            isClearable
            options={getAll()}
            value={value}
            onChange={(value) => onChange(value as CountrySelectValue)}
            formatOptionLabel={(option: any) => (
                <div className="flex flex-row items-center gap-3">
                    <div>{option.flag}</div>
                    <div>
                        {option.translations}, <span className="text-neutral-500">{option.region}</span>
                    </div>
                </div>
            )}
            classNames={{
                control: () => 'p-3 border-2',
                input: () => 'text-lg',
                option: () => "text-lg",
                menuList: () => 'z-50'
            }}
            theme={(theme) => ({
                ...theme,
                borderRadius: 6,
                colors: {
                    ...theme.colors,
                    primary: 'black',
                    primary25: '#ddf3ce'
                },
            })}
        />
    </div>
  )
}

export default CountrySelect