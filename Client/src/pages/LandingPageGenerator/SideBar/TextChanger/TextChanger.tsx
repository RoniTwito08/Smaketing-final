import textChangerStyles from './TextChanger.module.css';

export default function TextChanger() {
    return (
        <div className={textChangerStyles.textChangerContainer}>
            <input type="text" className={textChangerStyles.textChangerInput} />
            <button className={textChangerStyles.textChangerButton}>Change</button>
        </div>
    );
}