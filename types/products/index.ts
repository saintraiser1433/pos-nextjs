type Payment = {
  id: string
  amount: number
  status: "pending" | "processing" | "success" | "failed"
  email: string
}

export type ApiResponse<T> = {
  message: string;
  data?: T
}