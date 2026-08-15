"use client";

import { useState } from "react";

import ContactModal from "@/components/ui/contactModal/ContactModal";

import scss from "./sellerCard.module.scss";
import { getImageUrl } from "@/utils/getImageUrl";

interface ISellerCardProps {
  owner: string;
  avatar: string | null;
  isOwner: boolean;
  sellerEmail: string;
  clientEmail: string;
}

const SellerCard = ({
  owner,
  avatar,
  isOwner,
  sellerEmail,
  clientEmail,
}: ISellerCardProps) => {
  const [open, setOpen] = useState(false);

  const initials = owner
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <>
      <div className={scss.seller}>
        <span className={scss.label}>SELLER</span>

        <div className={scss.info}>
          <div className={scss.avatar}>
            {avatar ? <img src={getImageUrl(avatar)} alt={owner} /> : initials}
          </div>

          <div>
            <strong>{owner}</strong>

            {isOwner && <span>You are the owner</span>}
          </div>
        </div>

        {!isOwner && (
          <button className={scss.contact} onClick={() => setOpen(true)}>
            Contact Seller
          </button>
        )}
      </div>

      {open && (
        <ContactModal
          clientEmail={clientEmail}
          sellerEmail={sellerEmail}
          onClose={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default SellerCard;
