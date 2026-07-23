from pathlib import Path

REPLACEMENTS = {
    "Her public professional profile records a GED in October 2007, San Antonio College studies from 2009–2012, an A.A.S. in Paralegal Studies, honors, and Phi Theta Kappa involvement.": "Her public professional profile records San Antonio College studies from 2009–2012, an A.A.S. in Paralegal Studies, honors, and Phi Theta Kappa involvement.",
    "Her path includes a 2007 GED, honors-level paralegal studies at San Antonio College and Phi Theta Kappa involvement.": "Her path includes honors-level paralegal studies at San Antonio College and Phi Theta Kappa involvement.",
    "GED 2007 · San Antonio College 2009–2012 · honors · Phi Theta Kappa": "San Antonio College 2009–2012 · honors · Phi Theta Kappa",
    "GED (2007) · A.A.S. Paralegal Studies with honors (2012) · Phi Theta Kappa": "A.A.S. Paralegal Studies with honors (2012) · Phi Theta Kappa",
    "Her public professional profile records a GED earned in 2007 and San Antonio College studies from 2009–2012, culminating in an A.A.S. in Paralegal Studies with honors and Phi Theta Kappa involvement.": "Her public professional profile records San Antonio College studies from 2009–2012, culminating in an A.A.S. in Paralegal Studies with honors and Phi Theta Kappa involvement.",
}

for filename in ("index.html", "press-kit.html"):
    path = Path(filename)
    text = path.read_text(encoding="utf-8")
    for old, new in REPLACEMENTS.items():
        text = text.replace(old, new)
    path.write_text(text, encoding="utf-8")
