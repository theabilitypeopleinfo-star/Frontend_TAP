import React from "react";
import { Button, Wrap } from "../components/ui";
import { Hammer } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="bg-cream topo min-h-[60vh] flex items-center border-b border-line">
      <Wrap className="py-20 text-center flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-white border border-line flex items-center justify-center text-gold-dark mb-6 shadow-sm">
          <Hammer size={32} />
        </div>
        <h1 className="font-display text-[32px] md:text-[40px] text-teal-deep mb-4 leading-tight">
          Coming soon — we're still building this page
        </h1>
        <p className="text-stone text-[16px] md:text-[18px] max-w-xl mx-auto mb-8 leading-relaxed">
          This section isn't ready yet, but we're working hard to bring it to you. 
          In the meantime, you can still get in touch with our team for any information.
        </p>
        <Button to="/contact" variant="primary">
          Contact us
        </Button>
      </Wrap>
    </div>
  );
}
