import java.util.HashMap;
import java.util.Map;
import java.math.BigDecimal;
import java.math.RoundingMode;

public class CostConverter {
    private static final int DEFAULT_GLOBAL_FACTOR = 300;

    private static final Map<String, Integer> MONETARY_VALUES = new HashMap<String, Integer>() {{
        put("model1234", 500);
    }};

    public static int calculateCost(float time, BigDecimal money, String model) {
        return money.add(new BigDecimal(time * getTimeFactor(model)))
            .setScale(0, RoundingMode.HALF_UP).intValue();
    }

    private static int getTimeFactor(String name) {
        int retVal = DEFAULT_GLOBAL_FACTOR;

        name = name.toLowerCase();

        if (name != null) {
            if (MONETARY_VALUES.containsKey(name)) {
                retVal = MONETARY_VALUES.get(name);
            } else {
                System.out.println(String.format("Model '%s' not found, using default", name));
            }
        }

        // Convert to minutes
        return retVal / 60;
    }
}
    