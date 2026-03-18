import { startTransition, useState } from "react";
import Image from "next/image";
import { createSeanceAction } from "../../../actions/ seanceActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SessionAddModal({ onClose, onAdd, teachers = [], sessionList = []}) {
  const [formData, setFormData] = useState({
    titre: "",
    coatch: "",
    date: "",
    heure: "",
    credits: 3,
    places: 6,
  });
  const router = useRouter();

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Effacer l'erreur du champ modifié
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.titre.trim()) {
      newErrors.titre = "Le nom de la session est requis";
    }

    if (!formData.coatch.trim()) {
      newErrors.coatch = "Le nom du professeur est requis";
    }

    if (!formData.date) {
      newErrors.date = "La date est requise";
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate < today) {
        newErrors.date = "La date ne peut pas être dans le passé";
      }
    }

    if (formData.date && formData.heure) {
      const selectedDateTime = new Date(`${formData.date}T${formData.heure}`);
      if (selectedDateTime < new Date()) {
        newErrors.heure = "L'heure ne peut pas être dans le passé";
      }
    }

    if (formData.credits < 1 || formData.credits > 10) {
      newErrors.credits = "Les crédits doivent être entre 1 et 10";
    }

    if (formData.places < 1 || formData.places > 50) {
      newErrors.places = "Le nombre de places doit être entre 1 et 50";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   if (validateForm()) {
  //     const newSession = {
  //       ...formData,
  //       id: `#SES${String(Math.floor(Math.random() * 100000)).padStart(5, "0")}`,
  //       bookedPlaces: 0,
  //       remainingPlaces: formData.places,
  //       status: "Disponible",
  //       date: new Date(formData.date).toLocaleDateString("fr-FR", {
  //         day: "2-digit",
  //         month: "short",
  //         year: "numeric",
  //       }),
  //     };
  //     onAdd(newSession);
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);

    if (!validateForm()) return;

    startTransition(async () => {
      try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));

        await createSeanceAction(data);

        toast.success("Séance créée avec succès !");
        // onAdd(newSession);
        onClose?.(); // fermer le modal si tu veux
        window.location.reload();
      } catch (error) {
        console.error(error);
        toast.error(`Erreur lors de la création de la séance : ${error.message || error}`);
      }
    });
  };

  const generateRandomTime = () => {
    const hours = Math.floor(Math.random() * (20 - 8 + 1)) + 8;
    const minutes = Math.random() > 0.5 ? "00" : "30";
    setFormData((prev) => ({
      ...prev,
      heure: `${String(hours).padStart(2, "0")}:${minutes}`,
    }));
  };


  return (
    <div
      className="modal fade show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered modal-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="bi bi-plus-circle me-2"></i>
                Ajouter une nouvelle session
              </h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              <div className="row">
                {/* Avatar et upload */}
                {/* <div className="col-md-4 text-center mb-4">
                  <div className="avatar-preview mb-3">
                    <Image
                      src={formData.teacherAvatar}
                      alt="Avatar professeur"
                      width={120}
                      height={120}
                      className="rounded-circle m-lg-5"
                    />
                  </div>
                  <div className="button-wrapper">
                    <label htmlFor="upload" className="btn btn-primary me-2 mb-4" tabIndex={0}>
                      <span className="d-none d-sm-block">Changer de photo</span>
                      <i className="bx bx-upload d-block d-sm-none"></i>
                      <input
                        type="file"
                        id="upload"
                        className="account-file-input"
                        hidden
                        accept="image/png, image/jpeg"
                      />
                    </label>

                    <button
                      type="button"
                      className="btn btn-outline-secondary account-image-reset mb-4"
                    >
                      <i className="bx bx-reset d-block d-sm-none"></i>
                      <span className="d-none d-sm-block">Annuler</span>
                    </button>

                    <p className="text-muted mb-0">
                      Autorisé JPG, GIF ou PNG. Max 800K.
                    </p>
                  </div>
                </div> */}

                {/* Formulaire principal */}
                <div className="col-md-12">
                  {/* Nom de la session */}
                  {/* <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom de la session <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.titre ? "is-invalid" : ""}`}
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      placeholder="Ex: Pilates sur machine"
                    />
                    {errors.titre && (
                      <div className="invalid-feedback">{errors.titre}</div>
                    )}
                  </div> */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Nom de la session <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.titre ? "is-invalid" : ""}`}
                      name="titre"
                      value={formData.titre}
                      onChange={handleChange}
                      placeholder="Ex: Pilates sur machine"
                      list="sessionList"
                    />
                    {sessionList.length > 0 && (
                      <datalist id="sessionList">
                        {sessionList.map((titre, index) => (
                          <option key={index} value={titre} />
                        ))}
                      </datalist>
                    )}
                    {errors.titre && (
                      <div className="invalid-feedback">{errors.titre}</div>
                    )}
                  </div>

                  {/* Professeur */}
                  <div className="mb-3">
                    <label className="form-label fw-bold">
                      Professeur <span className="text-danger">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.coatch ? "is-invalid" : ""}`}
                      name="coatch"
                      value={formData.coatch}
                      onChange={handleChange}
                      placeholder="Nom du professeur"
                      list="teachersList"
                    />
                    {teachers.length > 0 && (
                      <datalist id="teachersList">
                        {teachers.map((coatch, index) => (
                          <option key={index} value={coatch} />
                        ))}
                      </datalist>
                    )}
                    {errors.coatch && (
                      <div className="invalid-feedback">{errors.coatch}</div>
                    )}
                  </div>

                  {/* Date et Heure */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Date <span className="text-danger">*</span>
                      </label>
                      <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                      />
                      {errors.date && (
                        <div className="invalid-feedback">{errors.date}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Heure <span className="text-danger">*</span>
                      </label>
                      <div className="input-group">
                        <input
                          type="time"
                          className={`form-control ${errors.heure ? "is-invalid" : ""}`}
                          name="heure"
                          value={formData.heure}
                          onChange={handleChange}
                        />
                        <button
                          type="button"
                          className="btn btn-outline-secondary"
                          onClick={generateRandomTime}
                          title="Générer une heure aléatoire"
                        >
                          <i className="bi bi-shuffle"></i>
                        </button>
                      </div>
                      {errors.heure && (
                        <div className="invalid-feedback d-block">{errors.heure}</div>
                      )}
                    </div>
                  </div>

                  {/* Crédits et places */}
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Crédits requis <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.credits ? "is-invalid" : ""}`}
                        name="credits"
                        min="1"
                        max="10"
                        value={formData.credits}
                        onChange={handleChange}
                      />
                      {errors.credits && (
                        <div className="invalid-feedback">{errors.credits}</div>
                      )}
                    </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label fw-bold">
                        Nombre de places <span className="text-danger">*</span>
                      </label>
                      <input
                        type="number"
                        className={`form-control ${errors.places ? "is-invalid" : ""}`}
                        name="places"
                        min="1"
                        max="50"
                        value={formData.places}
                        onChange={handleChange}
                      />
                      {errors.places && (
                        <div className="invalid-feedback">{errors.places}</div>
                      )}
                    </div>
                  </div>

                  <div className="alert alert-info d-flex align-items-start">
                    <i className="bi bi-info-circle me-2 mt-1"></i>
                    <small>
                      L'ID de la session sera généré automatiquement. Le statut sera défini sur{" "}
                      <b>"Disponible"</b> par défaut.
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>
                <i className="bi bi-x-circle me-1"></i> Annuler
              </button>
              <button type="submit" className="btn btn-primary">
                <i className="bi bi-check-circle me-1"></i> Créer la session
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
