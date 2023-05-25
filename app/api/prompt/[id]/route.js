import { connectToDB } from "@/utils/database";
import Prompt from "@/models/prompt";

// GET (to read)
export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch the prompt", { status: 500 });
  }
};

// PATCH (to update)
export const PATCH = async (req, { params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDB();
    const exsitPrompt = await Prompt.findById(params.id);
    if (!exsitPrompt) return new Response("Prompt not found", { status: 404 });

    exsitPrompt.prompt = prompt;
    exsitPrompt.tag = tag;

    await exsitPrompt.save();
    return new Response(JSON.stringify(exsitPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update the prompt", { status: 500 });
  }
};

// DELETE (to delete)
export const DELETE = async (req, { params }) => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", { status: 200 });
  } catch (error) {
    return new Response("Error deleting prompt", { status: 500 });
  }
};
