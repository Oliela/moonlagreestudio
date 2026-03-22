"use client";
import { toast } from "sonner";
import { acheterPackAction } from "../../../actions/achatPackActions";
import "./../styles/PackPackCardRemake.css";
import { useEffect, useState } from "react";


export default function PackPackCardRemake({ pack, user }) {
    // const [isPending, setIsPending] = useState(false);

    const getThemeColor = (theme) => {
        switch (theme?.toLowerCase()) {
            case "success":
                return "#0a4d0ade";
            case "purple":
                return "#580758";
            case "warning":
                return "#bb7a01";
            case "danger":
                return "#660909";
            case "primary":
                return "#062c54";
            case "info":
                return "#127f90";
            default:
                return "#000"; // couleur par défaut
        }
    };

    const [PayTechLoaded, setPayTechLoaded] = useState(false);
    const [isPending, setIsPending] = useState(false);

    // Charger le SDK PayTech côté client
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://paytech.sn/cdn/paytech.min.js";
        script.async = true;
        script.onload = () => setPayTechLoaded(true);
        document.body.appendChild(script);
        return () => {
            document.body.removeChild(script);
        };
    }, []);


    const payerPack = async () => {
        if (!user) {
            toast.error("Veuillez vous connecter pour acheter un pack.");
            return;
        }

        setIsPending(true);

        // ✅ Calcul du montant
        const amount =
            pack.promotion && pack.promotion > 0
                ? pack.promotion
                : pack.prix;

        try {
            const res = await fetch("/api/paytech/create-payment", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: user.id,
                    packId: pack.id,
                    amount,
                    userTelephone: user.telephone,
                    userName: user.name,
                }),
            });

            const data = await res.json();

            // ⛔ Achat bloqué AVANT PayTech
            if (!data.success) {
                toast.error(data.message || "Achat impossible");
                return;
            }

            // ✅ OK → redirection
            toast.info("Redirection vers la page de paiement...");
            // console.log(data.redirect_url);
            
            window.location.href = data.redirect_url;

        } catch (error) {
            console.error(error);
            toast.error("Erreur réseau lors de la création du paiement");
        } finally {
            setIsPending(false);
        }
    };


    // const payerPack = async () => {
    //     if (!user) {
    //         toast.error("Veuillez vous connecter pour acheter un pack.");
    //         return;
    //     }

    //     setIsPending(true);

    //     // ✅ Calcul du montant
    //     const amount =
    //         pack.promotion && pack.promotion > 0
    //             ? pack.promotion
    //             : pack.prix;
    //     console.log(amount);
    // };


    //une fonction qui recupere le pack.theme et remvoie la couleur pour le style
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="pricing-card">
                <div className="card-header-custom"
                    style={{ backgroundColor: pack?.theme_color ?? "000" }}
                >
                    <i className="ri-refresh-line icon-header"></i>
                    <h2>{pack.titre}</h2>
                </div>

                <div className="card-body-custom">
                    <div className="credits-section" >
                        {/* <div className="credits-value" style={{ color: getThemeColor(pack?.theme_color) }}>{pack.credits}</div>
                         */}
                        <div className="credits-value" style={{ color: pack?.theme_color ?? "000" }}>{pack.credits}</div>
                        <div className="credits-label">crédits</div>
                    </div>

                    <div className="price-section">
                        {pack.promotion && pack.promotion > 0 ? (
                            <>
                                <div className="price-old">
                                    {pack.prix.toLocaleString()} FCFA
                                </div>
                                <div className="price-main" style={{ color: pack?.theme_color ?? "000" }}>
                                    {pack.promotion.toLocaleString()} FCFA
                                </div>
                            </>
                        ) : (
                            <div className="price-main" style={{ color: pack?.theme_color ?? "000" }}>
                                {pack.prix.toLocaleString()} FCFA
                            </div>
                        )}
                        <div className="price-label">Prix</div>
                    </div>


                    <ul className="features-list">

                        <li>Rechargement instantané</li>
                        <li>Crédits valables {pack.duree} jours</li>
                        <li>Support client </li>
                        {/* <li> 1 crédit = 1 séance (Lagree, Pilates Mat ou Yoga)</li> */}
                    </ul>

                    <div style={{ color: pack?.theme_color ?? "000" }}>
                        {pack.description && (
                            <p>
                                {pack.description}
                            </p>
                        )
                        }
                    </div>
                    <button
                        className="btn-buy-custom"
                        style={{ backgroundColor: pack?.theme_color ?? "000" }}
                        onClick={payerPack}
                        disabled={isPending}
                    >
                        {isPending ? "En cours ..." : "Recharger"}
                    </button>

                </div>
            </div>
        </div>
    );
}