// @ts-nocheck
"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { EcommerceUserDto } from "@/interfaces/auth/auth.interface";
import { updateUserProfileImage } from "@/services/auth.service";
import ProfileImageUpload from "@/components/customer/profile-image-upload.component";
import UserUpdateForm from "@/components/customer/user-update-form.component";
import Button from "@/components/ui/button.component";

const cardCls = "rounded-container border border-line bg-white p-7";
const labelCls = "text-[13px] font-bold uppercase tracking-[0.04em] text-ink2-400";
const fieldLabel = "text-[12.5px] text-ink2-400";
const fieldValue = "text-[15px] font-medium text-text";

interface ProfileTabProps {
  user: EcommerceUserDto;
  onImageUpdate: (imageUrl: string) => void;
  onUserUpdate: (user: EcommerceUserDto) => void;
}

export default function ProfileTab({ user, onImageUpdate, onUserUpdate }: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdatingImage, setIsUpdatingImage] = useState(false);
  const [imageError, setImageError] = useState("");
  const { data: session, update } = useSession();

  const handleImageChange = async (file: File | null) => {
    if (!file) return;
    setIsUpdatingImage(true);
    setImageError("");
    try {
      const response = await updateUserProfileImage(user.id, file);
      if (response.succeeded && response.data) {
        const newPhotoUrl = response.data;
        onImageUpdate(newPhotoUrl);
        await update({ ...session, user: { ...session?.user, image: newPhotoUrl } });
      } else {
        setImageError(response.message || "Error al actualizar la imagen");
      }
    } catch (e) {
      console.error("Error updating profile image:", e);
      setImageError("Error al actualizar la imagen");
    } finally {
      setIsUpdatingImage(false);
    }
  };

  const basicFields = [
    { label: "Primer nombre", value: user.firstName },
    { label: "Apellido", value: user.lastName },
    { label: "Email", value: user.email },
    { label: "Usuario", value: user.userName },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-[24px] font-bold tracking-[-0.02em] text-text">Información personal</h2>
        {!isEditing && (
          <Button variant="primary" size="sm" onClick={() => setIsEditing(true)}>
            Editar información
          </Button>
        )}
      </div>

      {isEditing ? (
        <UserUpdateForm
          user={user}
          onUserUpdate={(u) => {
            onUserUpdate(u);
            setIsEditing(false);
          }}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {/* Foto */}
          <div className={`${cardCls} flex flex-col`}>
            <div className={`${labelCls} mb-5`}>Foto de perfil</div>
            <ProfileImageUpload
              currentImage={user.photo}
              onImageChange={handleImageChange}
              isLoading={isUpdatingImage}
            />
            {imageError && (
              <p className="mt-3 rounded-[10px] bg-[#FEF2F2] px-3 py-2 text-[13px] text-[#B91C1C]">{imageError}</p>
            )}
          </div>

          {/* Datos básicos */}
          <div className={cardCls}>
            <div className={`${labelCls} mb-5`}>Datos básicos</div>
            <div className="flex flex-col gap-[18px]">
              {basicFields.map((f) => (
                <div key={f.label}>
                  <div className={fieldLabel}>{f.label}</div>
                  <div className={fieldValue}>{f.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Información adicional */}
          <div className={cardCls}>
            <div className={`${labelCls} mb-5`}>Información adicional</div>
            <div className="flex flex-col gap-[18px]">
              <div>
                <div className={fieldLabel}>Teléfono</div>
                <div className={fieldValue}>{user.phoneNumber || "No especificado"}</div>
              </div>
              <div>
                <div className={fieldLabel}>Departamento</div>
                <div className={fieldValue}>{user.department?.name || "No especificado"}</div>
              </div>
              <div>
                <div className={fieldLabel}>Tipo de cliente</div>
                <div className="flex items-center gap-2">
                  <span className={fieldValue}>{user.customerType?.name || "No especificado"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
