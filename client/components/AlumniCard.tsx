import { Alumni } from "@/data/alumni";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface AlumniCardProps {
  alumni: Alumni;
  featured?: boolean;
}

export default function AlumniCard({ alumni, featured = false }: AlumniCardProps) {
  return (
    <Card
      className={`overflow-hidden border transition-all hover:shadow-lg ${
        featured
          ? "border-primary/50 hover:-translate-y-2 hover:border-primary"
          : "border-primary/20 hover:border-primary/40"
      }`}
    >
      <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 to-green-600/10">
        <img
          src={alumni.imageUrl}
          alt={alumni.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform"
        />
        {featured && (
          <div className="absolute top-3 right-3 bg-primary text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm font-semibold">
            <Star className="h-4 w-4 fill-white" />
            Featured
          </div>
        )}
      </div>

      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-foreground">{alumni.name}</h3>
          <p className="text-primary font-semibold text-sm mt-1">
            Batch {alumni.year}
          </p>
        </div>

        <div className="space-y-3 mb-4">
          <div>
            <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
              Current Position
            </p>
            <p className="text-foreground font-semibold">{alumni.currentPosition}</p>
          </div>

          <div>
            <p className="text-xs font-semibold text-foreground/60 uppercase tracking-wide">
              Organization
            </p>
            <p className="text-foreground">{alumni.organization}</p>
          </div>

          <div>
            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20">
              {alumni.field}
            </Badge>
          </div>
        </div>

        <p className="text-sm text-foreground/70 leading-relaxed line-clamp-3">
          {alumni.bio}
        </p>
      </CardContent>
    </Card>
  );
}
