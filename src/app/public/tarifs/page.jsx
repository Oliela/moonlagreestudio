import { FAQ } from "@/components/FAQ";
import HeroHeader from "@/components/HeroSection";
import { faqData, heroHeaders } from "@/data/data";
import PackCard from "../../../components/public/packs/PackCard";
import { headers } from "next/headers";
import { auth } from "../../../lib/auth";
import prisma from "../../../lib/prisma";
import PackPackCardRemake from "../../../components/public/packs/PackCardRemake";

export default async function PricingPage() {
  // const packs = [
  //   { titre: "Débutant", credits: 10, prix: 120000, promotion: 80000 },
  //   { titre: "Débutant", credits: 10, prix: 120000 },
  //   { titre: "Standard", credits: 20, prix: 40000 },
  //   { titre: "Premium", credits: 125, prix: 50000 },
  // ];

  const h = await headers();
  let session = null;

  try {
    session = await auth.api.getSession({ headers: h });
  } catch (err) {
    console.warn("Aucune session trouvée :", err);
  }

  const packs = await prisma.pack.findMany({
    where: { visible: true },
    orderBy: { createdAt: "asc" },
  });

  return (
    <>
      <HeroHeader
        title={heroHeaders.tarifs.title}
        breadcrumbs={heroHeaders.tarifs.breadcrumbs}
        backgroundImage="/img/new/4.jpeg"
      />

      {/* <!-- Crédits--> */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-3">Choisis le pack qui te correspond !</h2>
          <p className="text-muted mb-5">
            Découvre nos différentes formules et choisis le forfait qui
            s&apos;intègre parfaitement dans ton quotidien selon ton rythme et tes envies.
          </p>

          <div className="row g-4 justify-content-center">
            {packs.length > 0 ? (
              packs.map((pack, idx) => <PackPackCardRemake key={idx} pack={pack} user={session?.user} />)
            ) : (
              <div className="col-12 text-center p-5">
                <p className="text-muted fw-semibold">
                  Aucun pack disponible pour le moment. Revenez bientôt pour découvrir nos offres !
                </p>
              </div>
            )}
          </div>

        </div>
      </section>


      {/* <!-- Comment fonctionne les crédits --> */}
      <div className="py-5">
        <div className="container py-5">
          <div className="row g-4">
            <div className="col-lg-12 col-12" style={{ textAlign: "center" }}>
              <div className="mb-5">
                <h1
                  className="fw-bold display-4 pb-3"
                  data-aos="fade-right"
                  data-aos-duration="600"
                >
                  Comment ça marche ?
                </h1>
                <p className="fw-bold fs-5" data-aos="fade-right" data-aos-duration="600">
                  Credits & Reservations
                </p>
                <p className="fw-bold fs-5" data-aos="fade-right" data-aos-duration="600">
                  Chez Moon Lagree Studio, chaque séance se réserve en ligne, grâce à un système de crédits.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-6" style={{ textAlign: "justify", paddingRight: "30px" }}>
              <span
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                <span className="fw-bold"> Comment Acheter des credits ? </span>  <br />
                <p> Consultez les differents pack de credits disponible sur la page “Achat credits”
                  Choisissez votre pack, et reglez via Mobile money
                  Vos credits sont automatiquement ajoutes a votre portefeuille
                  Vous pouvez desormais effectuer vos reservations </p>
                <ul style={{ listStyleType: "disc" }}>
                  <li> 3 crédits = 1 Séance de Lagree. (Sauf cours particuliers)</li>
                  <li> ⁠Vos crédits sont valables pendant une période définie (selon le pack choisi).</li>
                  <li>⁠Plus le pack est important, plus le prix par séance est avantageux.</li>
                </ul>
              </span>
              <p>  Le système de crédits vous permet de réserver vos cours selon votre rythme, sans abonnement obligatoire.</p>
              <span
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                <span className="fw-bold">Comment réserver une séance ?</span>  <br />
                <ol style={{ listStyleType: "decimal" }}>
                  <li>Créez votre compte.</li>
                  <li>Consultez le planning des cours (Moon Burn, Full Moon, Moon Flow…).</li>
                  <li>Choisissez votre créneau</li>
                  <li>Choisissez votre moyen de paiement (Via vos credits, Via Mobile Money ou en espèces sur place)</li>
                  <li>confirmer la reservation.</li>
                </ol>
              </span>

            </div>

            <div className="col-lg-6 col-6" style={{ textAlign: "justify", paddingLeft: "30px" }}>


              <span
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                <span className="fw-bold">Annulation & modification</span>  <br />
                <ul style={{ listStyleType: "disc" }}>
                  <li>Vous pouvez annuler ou déplacer votre séance jusqu’à 12 heures avant le début du cours.</li>
                  <li>Passé ce délai, le crédit est perdu car la place aurait pu être réattribuée.</li>
                  <li>Si le cours est complet, vous pouvez vous inscrire sur liste d’attente : si une place se libère, vous recevez une notification automatique.</li>
                </ul>
              </span>

              <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                <span className="fw-bold">L'arrivée au studio</span>  <br />
                Nous vous recommandons d’arriver 10 minutes avant le début du cours pour vous installer, rencontrer votre coach et démarrer sereinement.
              </p>

              <p
                className="text-dark"
                data-aos="fade-left"
                data-aos-duration="700"
              >
                ✨ Réservez au rythme qui vous convient. <br />
                ✨ Des crédits flexibles, un planning simple, une expérience premium.
              </p>

              <p
                className="text-dark fw-bold"
                data-aos="fade-left" s
                data-aos-duration="700"
              >
                Pour toute question ou soucis à la reservation n’hesitez pas a nous contacter.
              </p>
            </div>

          </div>
        </div>
      </div>



      <FAQ data={faqData.credits} />
      {/* <SubscribeSection /> */}
    </>
  );
}
