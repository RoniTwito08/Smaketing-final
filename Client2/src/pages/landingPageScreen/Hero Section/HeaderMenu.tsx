const HeaderMenu: React.FC = ({}) => {
  return (
    <div style={styles.frame}>
      <ul style={styles.menu}>
        <li style={styles.menuItem}>דף הבית</li>
        <li style={styles.menuItem}>אודות</li>
        <li style={styles.menuItem}>תכונות</li>
        <li style={styles.menuItem}>צור קשר</li>
      </ul>
    </div>
  );
};

const styles = {
  frame: {
    height: "70px",
    backgroundColor: "#FFFFFF",
    opacity: "0.5",
    borderRadius: "20px",
    fontFamily: "Assistant",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "60px",
    paddingLeft: "60px",
  },
  menu: {
    display: "flex",
    listStyle: "none", // הסרת נקודות מהרשימה
    justifyContent: "center",
    gap: "100px",
    padding: 0,
    margin: 0,
    flexDirection: "row-reverse" as const,
  },
  menuItem: {
    fontSize: "18px",
    color: "#001D3F",
    cursor: "pointer",
  },
};

export default HeaderMenu;
