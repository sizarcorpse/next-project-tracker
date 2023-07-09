import { NextResponse } from "next/server";

type ResponseData = {
  status: string;
  message: string | null;
  data: any;
};

type CreateResponseType = (
  status: string,
  message: string | null,
  data: any,
  code: number
) => NextResponse<ResponseData>;

const createResponse: CreateResponseType = (status, message, data, code) => {
  return new NextResponse(
    JSON.stringify({
      status: status,
      message: message,
      data: data,
    }),
    { status: code }
  );
};

export default createResponse;
