import "@/lib/envConfig"
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const userId = "user_2sdrInjp9MIarkQMVJBtw16tAlf";

// Vérifier qu'on est bien en mode développement
if (process.env.NODE_ENV !== "development") {
  console.error("❌ ERROR: You are not in development mode! Aborting seed...");
  process.exit(1);
}

async function main() {
  console.log("🚀 Début du seed...");

  // 🗑️ 1. Supprimer toutes les anciennes données
  console.log("🗑️ Suppression des anciennes données...");
  await prisma.transaction.deleteMany();
  await prisma.category.deleteMany();
  await prisma.monthHistory.deleteMany();
  await prisma.yearHistory.deleteMany();
  console.log("✅ Anciennes données supprimées !");

  // 📌 2. Insérer des catégories plus riches
  console.log("📌 Ajout des catégories...");
  const categories = [
    { name: "Salaire", icon: "💰", type: "income" },
    { name: "Primes", icon: "🎁", type: "income" },
    { name: "Investissements", icon: "📈", type: "income" },
    { name: "Loyer", icon: "🏠", type: "expense" },
    { name: "Factures", icon: "🧾", type: "expense" },
    { name: "Transport", icon: "🚗", type: "expense" },
    { name: "Nourriture", icon: "🍔", type: "expense" },
    { name: "Loisirs", icon: "🎮", type: "expense" },
    { name: "Santé", icon: "🏥", type: "expense" },
    { name: "Voyages", icon: "✈️", type: "expense" },
    { name: "Shopping", icon: "🛍️", type: "expense" },
    { name: "Sport", icon: "🏋️", type: "expense" },
  ];

  for (const category of categories) {
    await prisma.category.create({
      data: {
        name: category.name,
        userId,
        icon: category.icon,
        type: category.type,
      },
    });
  }
  console.log("✅ Catégories ajoutées !");

  // 📊 3. Générer un historique détaillé (Janvier 2023 - Janvier 2025)
  console.log("📊 Génération de l'historique mensuel et annuel...");

  let currentDate = new Date("2023-01-01");
  const endDate = new Date("2025-01-31");

  while (currentDate <= endDate) {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    // Générer des revenus et dépenses réalistes
    const income = 2500 + Math.floor(Math.random() * 2000); // Salaire entre 2500 et 4500
    const expense = 1200 + Math.floor(Math.random() * 2500); // Dépenses entre 1200 et 3700

    // Insérer l'historique mensuel
    await prisma.monthHistory.create({
      data: {
        userId,
        day: 1,
        month,
        year,
        income,
        expense,
      },
    });

    // Insérer l'historique annuel (mise à jour progressive)
    await prisma.yearHistory.upsert({
      where: { month_year_userId: { month, year, userId } },
      update: { income, expense },
      create: { userId, month, year, income, expense },
    });

    currentDate.setMonth(currentDate.getMonth() + 1); // Passer au mois suivant
  }

  console.log("✅ Historique mensuel et annuel généré !");

  // 💳 4. Générer des transactions plus riches pour les 3 derniers mois
  console.log(
    "💳 Génération des transactions détaillées pour les 3 derniers mois..."
  );

  const recentStartDate = new Date();
  recentStartDate.setMonth(recentStartDate.getMonth() - 3);

  while (recentStartDate <= new Date()) {
    const month = recentStartDate.getMonth() + 1;
    const year = recentStartDate.getFullYear();

    const transactions = [
      {
        amount: 3000 + Math.floor(Math.random() * 800),
        description: `Salaire du mois`,
        date: new Date(year, month - 1, 1),
        type: "income",
        category: "Salaire",
        categoryIcon: "💰",
      },
      {
        amount: 800 + Math.floor(Math.random() * 500),
        description: "Prime exceptionnelle",
        date: new Date(year, month - 1, 5),
        type: "income",
        category: "Primes",
        categoryIcon: "🎁",
      },
      {
        amount: -900 - Math.floor(Math.random() * 100),
        description: "Loyer appartement",
        date: new Date(year, month - 1, 6),
        type: "expense",
        category: "Loyer",
        categoryIcon: "🏠",
      },
      {
        amount: -250 - Math.floor(Math.random() * 100),
        description: "Courses hebdomadaires",
        date: new Date(year, month - 1, 12),
        type: "expense",
        category: "Nourriture",
        categoryIcon: "🍔",
      },
      {
        amount: -80 - Math.floor(Math.random() * 50),
        description: "Abonnement Netflix & Spotify",
        date: new Date(year, month - 1, 15),
        type: "expense",
        category: "Loisirs",
        categoryIcon: "🎮",
      },
      {
        amount: -100 - Math.floor(Math.random() * 100),
        description: "Achat équipement sportif",
        date: new Date(year, month - 1, 20),
        type: "expense",
        category: "Sport",
        categoryIcon: "🏋️",
      },
      {
        amount: -150 - Math.floor(Math.random() * 100),
        description: "Consultation médicale",
        date: new Date(year, month - 1, 25),
        type: "expense",
        category: "Santé",
        categoryIcon: "🏥",
      },
      {
        amount: -400 - Math.floor(Math.random() * 300),
        description: "Weekend à la mer",
        date: new Date(year, month - 1, 28),
        type: "expense",
        category: "Voyages",
        categoryIcon: "✈️",
      },
    ];

    for (const transaction of transactions) {
      await prisma.transaction.create({
        data: {
          amount: transaction.amount,
          description: transaction.description,
          date: transaction.date,
          userId,
          type: transaction.type,
          category: transaction.category,
          categoryIcon: transaction.categoryIcon,
        },
      });
    }

    recentStartDate.setMonth(recentStartDate.getMonth() + 1);
  }

  console.log("✅ Transactions enrichies générées pour les 3 derniers mois !");
  console.log("🎉 SEEDING TERMINÉ !");
}

main()
  .catch((e) => {
    console.error("❌ ERREUR SEEDING :", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
