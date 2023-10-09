import React from "react";
import SidebarCard from "../CardsLayout/SidebarCard";
import Typography from "components/Typography/Typography";
import styles from "./DetailCard.module.css";

const DetailCard = () => {
  return (
    <>
      <SidebarCard className={styles.detailCard}>
        <Typography className={styles.cardTitle}>Details</Typography>
        <Typography className={styles.cardDetail}>
          Number of Properties: <span>2</span>
        </Typography>
        <Typography className={styles.cardDetail}>
          Photograph Project: <span>3</span>
        </Typography>
        <Typography className={styles.cardDetail}>
          Status: <span>Silver</span>
        </Typography>
      </SidebarCard>
    </>
  );
};

export default DetailCard;
