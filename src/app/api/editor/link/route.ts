interface MetaData {
  title: string;
  description: string;
  image: {
    url: string;
  };
}

interface ResponseData {
  success: number;
  meta: MetaData;
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const href = url.searchParams.get("url");

  if (!href) {
    return new Response("Invalid href", { status: 400 });
  }

  try {
    const response = await fetch(href);
    const data = await response.text();

    const titleMatch = data.match(/<title>(.*?)<\/title>/);
    const title = titleMatch ? titleMatch[1] : "";

    const descriptionMatch = data.match(
      /<meta name="description" content="(.*?)"/
    );
    const description = descriptionMatch ? descriptionMatch[1] : "";

    const imageMatch = data.match(/<meta property="og:image" content="(.*?)"/);
    const imageUrl = imageMatch ? imageMatch[1] : "";

    const responseData: ResponseData = {
      success: 1,
      meta: {
        title,
        description,
        image: {
          url: imageUrl,
        },
      },
    };

    return new Response(JSON.stringify(responseData));
  } catch (error: any) {
    return new Response(error.message, { status: 500 });
  }
}
