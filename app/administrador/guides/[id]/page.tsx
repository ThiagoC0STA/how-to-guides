"use client";

import { useParams } from "next/navigation";
import GuideForm from "../components/GuideForm";

export default function GuidePage() {
  const params = useParams();
  const id = params?.id as string;

  console.log("GuidePage", id);

  return <GuideForm guideId={id} />;
} 