import java.math.BigDecimal;

public class Main {
    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.err.println("Required arguments 'time' and 'money' not provided");
            System.err.println("usage: java -jar costconverter.jar <time> <money> <model>");

            return;
        }

        float time;
        BigDecimal money;
        String model = "";

        try {
            time = Float.parseFloat(args[0]);
        } catch (NumberFormatException nfe) {
            printNumberFormatException("time", args[0]);
            return;
        }

        try {
            money = new BigDecimal(args[1]);
        } catch (NumberFormatException nfe) {
            printNumberFormatException("money", args[1]);
            return;
        }

        if (args.length > 2) {
            model = args[2];
        }


        int cost = CostConverter.calculateCost(time, money, model);

        System.out.println(cost);
    }

    public static void printNumberFormatException(String parameter, String value) {
        System.err.println(String.format("%s '%s' is not a number", parameter, value));
    }
}
