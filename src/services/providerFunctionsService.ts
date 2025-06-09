
import { ProviderDTO } from "@/components/utils/typing";


const baseUrl = "http://localhost:5035/admin"

export const fetchProviders = async (
  setProviders: React.Dispatch<React.SetStateAction<ProviderDTO[]>>,
  setFilteredProviders: React.Dispatch<React.SetStateAction<ProviderDTO[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: "success" | "error" }>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true)
    const response = await fetch(`${baseUrl}/listProviders`, {
      credentials: "include",
    })
    if (!response.ok) throw new Error("Error al obtener proveedores")

    const data: ProviderDTO[] = await response.json()
    setProviders(data)
    setFilteredProviders(data)
  } catch (error) {
    console.error("Error fetching providers:", error)
    setSnackbar({ open: true, message: "Error al cargar proveedores", severity: "error" })
  } finally {
    setLoading(false)
  }
}

export const approveProvider = async (
  id: number,
  setProviders: React.Dispatch<React.SetStateAction<ProviderDTO[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: "success" | "error" }>>,
  onCloseDialog: () => void
) => {
  try {
    const response = await fetch(`${baseUrl}/approveProvider/${id}`, {
      method: "POST",
      credentials: "include",
    })

    if (!response.ok) throw new Error("Error al aprobar proveedor")

    setProviders(prev =>
      prev.map(p => (p.Id === id ? { ...p, EsAprobado: true } : p))
    )
    setSnackbar({ open: true, message: "Proveedor aprobado correctamente", severity: "success" })
    onCloseDialog()
  } catch (error) {
    console.error("Error approving provider:", error)
    setSnackbar({ open: true, message: "Error al aprobar proveedor", severity: "error" })
  }
}

export const deactivateProvider = async (
  id: number,
  setProviders: React.Dispatch<React.SetStateAction<ProviderDTO[]>>,
  setSnackbar: React.Dispatch<React.SetStateAction<{ open: boolean; message: string; severity: "success" | "error" }>>,
  onCloseDialog: () => void
) => {
  try {
    const response = await fetch(`${baseUrl}/deactivateProvider/${id}`, {
      method: "PUT",
      credentials: "include",
    })

    if (!response.ok) throw new Error("Error al desactivar proveedor")

    setProviders(prev =>
      prev.map(p => (p.Id === id ? { ...p, EsAprobado: false } : p))
    )
    setSnackbar({ open: true, message: "Proveedor desactivado correctamente", severity: "success" })
    onCloseDialog()
  } catch (error) {
    console.error("Error deactivating provider:", error)
    setSnackbar({ open: true, message: "Error al desactivar proveedor", severity: "error" })
  }
}
