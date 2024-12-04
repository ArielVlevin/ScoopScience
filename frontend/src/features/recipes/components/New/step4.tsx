import { Switch, Label } from "@/components/ui";
import PageCard from "@/components/class/pageCard";
import RequiredLabel from "@/components/class/requiredLabel";
import { Separator } from "@/components/ui/separator";

type Step4Props = {
  formData: { isPublic: boolean };
  handleSwitchChange: (checked: boolean) => void;
  handleNext: () => void;
};

export default function Step4({
  formData,
  handleSwitchChange,
  handleNext,
}: Step4Props) {
  return (
    <PageCard title="Review">
      <div className="grid gap-2">
        <RequiredLabel htmlFor="isPublic">Make recipe public?</RequiredLabel>
        <Switch
          id="isPublic"
          checked={formData.isPublic}
          onCheckedChange={handleSwitchChange}
        />
      </div>
      <Separator className="mt-6 mb-6" />
      <div className="grid gap-2">
        <Label htmlFor="recipeSummary" className="text-xl font-medium">
          Recipe Summary
        </Label>
        <div onClick={handleNext} className="cursor-pointer">
          Click here to generate Recipe Preview
        </div>
      </div>
    </PageCard>
  );
}
