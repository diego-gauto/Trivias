type AvailableCodeState = 'disponible' | 'reclamado'

interface IAvailableCode {
  code_id: number
  code: string
  state: AvailableCodeState
  duration_type: 'A' | 'M' | 'C'
}

type CodeStatus = 'not-exist' | 'not-available' | 'available';


interface ICodeResponse {
  status: CodeStatus,
  subscriptionType: 'A' | 'M' | 'C',
  codeId: number,
}

interface IUpdateMembershipData {
  current_final_date: number,
  current_start_date: number,
  current_level: number,
  level: number,
  user_id: number,
  type: string,
  days: number,
  admin_update_id: number,
}

interface IMembershipData {
  id: number
  user_id: number
  final_date: number
  level: number
  method: string
  payment_method: any
  plan_id: string
  plan_name: string
  start_date: number
  type: number
  admin_update_id: any
  is_canceled: number
}