import { getGenericQueryResponse, postGenericQueryResponse } from "../api/admin";
import { IUpdateMembershipData, updateMembershipPlanApi } from "../api/users";



async function searchCodeData() {
  try {
    const query = `select * from available_codes_view;`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IAvailableCode[];
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function validateCode(code: string, userId: number): Promise<ICodeResponse> {
  try {
    const codes = await searchCodeData();
    const searchedCode = codes.filter(c => c.code === code)[0];

    if (searchedCode === undefined) {
      return {
        status: 'not-exist',
        subscriptionType: 'M',
        codeId: 0
      };
    }

    if (searchedCode.state === 'reclamado') {
      return {
        status: 'not-available',
        subscriptionType: 'M',
        codeId: 0
      }
    }

    // Hacer procedimiento para ingresar el user_id del usuario y así
    // cambiar el registro en la base de datos donde señala quien
    // reclamo el codigo

    const updateCodeResponse = await updateCodeInfo(searchedCode.code_id, userId);
    console.log(updateCodeResponse);

    const activeSubscriptionResponse = await activeSubscription(userId, searchedCode.duration_type);
    console.log({ activeSubscriptionResponse });

    return {
      status: 'available',
      subscriptionType: searchedCode.duration_type,
      codeId: searchedCode.code_id
    };

  } catch (error) {
    console.error(error);
    return {
      status: 'not-available',
      subscriptionType: 'M',
      codeId: 0
    };
  }
}

async function updateCodeInfo(codeId: number, userId: number): Promise<any> {
  try {
    const query = `update codes set user_id = ${userId} where code_id = ${codeId};`;
    console.log({ query });
    const response = await postGenericQueryResponse(query);
    return response;
  } catch (error) {
    console.error(error);
    return false;
  }
}

async function activeSubscription(userId: number, subscriptionType: 'C' | 'A' | 'M') {
  const level = subscriptionType === 'M' ? 6 : (subscriptionType === 'A' ? 5 : 8);
  const days = subscriptionType === 'M' ? 30 : (subscriptionType === 'A' ? 365 : 120);

  try {

    const today = new Date();
    today.setDate(today.getDate() + days);

    const finalDate = Math.floor(today.getTime() / 1000);

    const currentMembership = await getCurrentMembershipData(userId) as IMembershipData;

    const { level: currentLevel, start_date } = currentMembership;

    const body = {
      current_final_date: finalDate,
      level,
      current_level: currentLevel,
      user_id: userId,
      days,
      type: `0`,
      current_start_date: start_date,
      admin_update_id: null
    };

    console.log({ body });

    const updateMembershipPlanResponse = await updateMembershipPlanApi(body);
    console.log({ updateMembershipPlanResponse });
    return updateMembershipPlanResponse;
  } catch (error) {
    console.log({ error });
  }
}

async function getCurrentMembershipData(userId: number) {
  try {
    const query = `select * from memberships where user_id = ${userId};`;
    const response = await getGenericQueryResponse(query);
    const data = response.data.data as IMembershipData[];

    return data[0]!;
  } catch (error) {
    console.error(error);
    return null;
  }
}
