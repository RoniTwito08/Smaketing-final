import fontsStyles from './fonts.module.css';

interface FontsProps {
    font: string;
    onFontSelect?: (font: string) => void;
}

export default function Font(props : FontsProps) {
    return(
        <div className={fontsStyles.fontContainer} onClick={() => props.onFontSelect && props.onFontSelect(props.font)}>
            <span className={fontsStyles.fontButton} style={{fontFamily: props.font}}>{props.font}</span>
        </div>
    )
}