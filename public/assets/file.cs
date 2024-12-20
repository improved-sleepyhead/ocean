using System;

class Program
{
    static void Main()
    {
        int[] denominations = { 5000, 2000, 1000, 500, 200, 100 };

        Console.Write("Введите сумму для снятия (не более 150000 рублей): ");
        int amount = int.Parse(Console.ReadLine());

        if (amount > 150000 || amount <= 0)
        {
            Console.WriteLine("Некорректная сумма. Введите сумму от 1 до 150000 рублей.");
            return;
        }

        if (amount % 100 != 0)
        {
            Console.WriteLine("Невозможно выдать указанную сумму. Сумма должна быть кратна 100 рублям.");
            return;
        }

        Console.WriteLine("Выдача купюр:");
        foreach (int denomination in denominations)
        {
            int count = amount / denomination;
            if (count > 0)
            {
                Console.WriteLine($"{count} x {denomination} руб.");
                amount -= count * denomination;
            }
        }
    }
}
