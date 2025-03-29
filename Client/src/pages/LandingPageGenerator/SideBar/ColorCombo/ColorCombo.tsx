import colorComboStyles from "./ColorCombo.module.css";

interface ColorComboProps {
    primaryColor: string;
    secondaryColor: string;
    tertiaryColor: string;
    textColor: string;
    onColorComboSelect?: (primaryColor:string , secondaryColor:string , tertiaryColor:string , textColor:string) => void;
}

export default function ColorCombo(props : ColorComboProps) {
    return (
        <div className={colorComboStyles.colorCombo} onClick={() => props.onColorComboSelect && props.onColorComboSelect(
            props.primaryColor,
            props.secondaryColor,
            props.tertiaryColor,
            props.textColor
        )}>
            <span className={`${colorComboStyles.colorButton} ${colorComboStyles.primaryColor}`} style={{ backgroundColor: props.primaryColor }}></span>
            <span className={`${colorComboStyles.colorButton} ${colorComboStyles.secondaryColor}`} style={{ backgroundColor: props.secondaryColor }}></span>
            <span className={`${colorComboStyles.colorButton} ${colorComboStyles.tertiaryColor}`} style={{ backgroundColor: props.tertiaryColor }}></span>
            <span className={`${colorComboStyles.colorButton} ${colorComboStyles.textColor}`} style={{ backgroundColor: props.textColor }}></span>
        </div>
    );
}
