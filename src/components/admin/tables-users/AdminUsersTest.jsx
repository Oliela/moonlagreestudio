"use client";
import React, { useState, useEffect, useMemo } from "react";
import UserHeader from "./UserHeader";
import UserTable from "./UserTable";
import UserPagination from "./UserPagination";
import DeleteModal from "./DeleteModal";
import UserViewModal from "@/components/admin/ui/UserViewModal";
import UserAddModal from "@/components/admin/ui/UserAddModal";
import { deleteUserAction } from "../../../actions/delete-user.action";
import UserEditModal from "../ui/UserEditModal";
import UserWalletModal from "../ui/UserWalletModal";

export default function AdminUsers({ user }) {
  // --- States globaux ---
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // --- Modals ---
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showModalWallet, setShowModalWallet] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, multiple: false, user: null });
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    setUsers(user);
  }, []);

  // --- Filtrage : protection contre les champs null/undefined ---
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchSearch = [u.name, u.email, String(u.id ?? ""), u.statut_compte].some(
        (field) => (field ?? "").toLowerCase().includes(searchQuery.toLowerCase())
      );
      const matchStatus = statusFilter === "All" || u.statut_compte === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [users, searchQuery, statusFilter]);

  // --- Tri : gestion des champs imbriqués wallet + types string/number ---
  const sortedUsers = useMemo(() => {
    if (!sortConfig.key) return filteredUsers;

    return [...filteredUsers].sort((a, b) => {
      let aVal, bVal;

      // Champs imbriqués dans wallet
      if (sortConfig.key === "credits") {
        aVal = a.wallet?.credit ?? 0;
        bVal = b.wallet?.credit ?? 0;
      } else if (sortConfig.key === "points") {
        aVal = a.wallet?.point ?? 0;
        bVal = b.wallet?.point ?? 0;
      } else {
        aVal = a[sortConfig.key] ?? "";
        bVal = b[sortConfig.key] ?? "";
      }

      const dir = sortConfig.direction === "asc" ? 1 : -1;

      // Tri alphabétique pour les strings (support accents français)
      if (typeof aVal === "string" && typeof bVal === "string") {
        return aVal.localeCompare(bVal, "fr", { sensitivity: "base" }) * dir;
      }

      // Tri numérique
      return (aVal - bVal) * dir;
    });
  }, [filteredUsers, sortConfig]);

  // --- Pagination ---
  const totalPages = Math.ceil(sortedUsers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedUsers = sortedUsers.slice(startIndex, startIndex + rowsPerPage);

  // --- Handlers ---
  const handleSelectAll = (isChecked) => {
    setSelectAll(isChecked);
    if (isChecked) {
      setSelectedUsers(paginatedUsers.map((u) => u.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
    setCurrentPage(1); // Revenir à la page 1 à chaque nouveau tri
  };

  const handleDelete = async (ids) => {
    try {
      for (const id of ids) {
        const res = await deleteUserAction({ userId: id });
        if (!res.success) {
          console.error(`Erreur suppression utilisateur ${id}: ${res.error}`);
        }
      }
      setUsers(users.filter((u) => !ids.includes(u.id)));
      setSelectedUsers([]);
      setDeleteModal({ show: false, multiple: false, user: null });
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  const handleAddUser = (newUser) => {
    setUsers([newUser, ...users]);
    setShowAddModal(false);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setShowEditModal(false);
  };

  const handleSaveWallet = (updated) => {
    setShowModalWallet(false);
    if (updated) {
      window.location.reload();
    }
  };

  return (
    <>
      <div className="card">
        <UserHeader
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
          selectedUsers={selectedUsers}
          onDeleteSelected={() =>
            setDeleteModal({ show: true, multiple: true, user: null })
          }
          onAddUser={() => setShowAddModal(true)}
        />

        <UserTable
          users={paginatedUsers}
          selectedUsers={selectedUsers}
          setSelectedUsers={setSelectedUsers}
          selectAll={selectAll}
          onSelectAll={handleSelectAll}
          onSort={handleSort}
          sortConfig={sortConfig}
          onEdit={(u) => {
            setSelectedUser(u);
            setShowEditModal(true);
          }}
          onWallet={(u) => {
            setSelectedUser(u);
            setShowModalWallet(true);
          }}
          onDelete={(u) =>
            setDeleteModal({ show: true, multiple: false, user: u })
          }
        />

        <UserPagination
          totalPages={totalPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          startIndex={startIndex}
          rowsPerPage={rowsPerPage}
          totalItems={sortedUsers.length}
        />
      </div>

      {/* --- Modals --- */}
      {showAddModal && (
        <UserAddModal onClose={() => setShowAddModal(false)} onAdd={handleAddUser} />
      )}
      {showEditModal && (
        <UserEditModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
          onSave={handleSaveEdit}
        />
      )}
      {showModalWallet && (
        <UserWalletModal
          user={selectedUser}
          onClose={() => setShowModalWallet(false)}
          onSaveWallet={handleSaveWallet}
        />
      )}
      {showViewModal && (
        <UserViewModal user={selectedUser} onClose={() => setShowViewModal(false)} />
      )}
      {deleteModal.show && (
        <DeleteModal
          isMultiple={deleteModal.multiple}
          user={deleteModal.user}
          count={selectedUsers.length}
          onCancel={() => setDeleteModal({ show: false, multiple: false, user: null })}
          onConfirm={() =>
            handleDelete(
              deleteModal.multiple ? selectedUsers : [deleteModal.user.id]
            )
          }
        />
      )}
    </>
  );
}