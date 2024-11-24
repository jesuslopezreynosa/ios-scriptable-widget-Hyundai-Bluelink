/**
 * References API and code from https://github.com/niklasvieth/polestar-ios-medium-widget
 */

/** Set Variables */
const HYUNDAI_BLUELINK_EMAIL: string = '';
const HYUNDAI_BLUELINK_PASSWORD: string = '';
const HYUNDAI_BLUELINK_ACCESS_PIN: string = '';
const HYUNDAI_BLUELINK_VIN: string = '';

// Check that params are set
if (HYUNDAI_BLUELINK_EMAIL === "EMAIL") {
    throw new Error("POLESTAR_EMAIL is not configured");
}
if (HYUNDAI_BLUELINK_PASSWORD == "PASSWORD") {
    throw new Error("POLESTAR_PASSWORD is not configured");
}
if (HYUNDAI_BLUELINK_ACCESS_PIN === "VIN") {
    throw new Error("VIN is not configured");
}
if (HYUNDAI_BLUELINK_VIN === "VIN") {
    throw new Error("VIN is not configured");
}

const DARK_MODE = Device.isUsingDarkAppearance();
const DARK_BG_COLOR = "1C3767";
const LIGHT_BG_COLOR = "FFFFFF";

const HYUNDAI_ICON_LIGHT = 'https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/manufacturers/hyundai-light-mode.png';
const HYUNDAI_ICON_DARK = 'https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/manufacturers/hyundai-dark-mode.png';
const HYUNDAI_IONIQ_5 = 'https://raw.githubusercontent.com/jesuslopezreynosa/ios-scriptable-widget-Hyundai-Bluelink/refs/heads/main/bluelink-widget/images/vehicles/2024-Hyundai-IONIQ_5-white-full_color-driver_side_front_quarter.png';

async function loadImage(url: string) {
    const request = new Request(url);
    return request.loadImage();
}

// WIP - From Polestar Widget, may need to refactor
function getBatteryPercentColor(percent: number) {
    if (percent > 70) {
        return Color.green();
    } else if (percent > 20) {
        return Color.orange();
    } else {
        return Color.red();
    }
}

// WIP - From Polestar Widget, may need to refactor
function getBatteryIcon(batteryPercent: number, isConnected: boolean, isCharging: boolean, isChargingDone: boolean) {
    let icon;
    let iconColor;
    if (isCharging || isChargingDone) {
        icon = isCharging
            ? SFSymbol.named("bolt.fill")
            : SFSymbol.named("bolt.badge.checkmark.fill");
        iconColor = Color.green();
    } else if (isConnected) {
        icon = SFSymbol.named("bolt.badge.xmark");
        iconColor = Color.red();
    } else {
        let percentRounded = 0;
        iconColor = Color.red();
        if (batteryPercent > 90) {
            percentRounded = 100;
        } else if (batteryPercent > 60) {
            percentRounded = 75;
        } else if (batteryPercent > 40) {
            percentRounded = 50;
        } else if (batteryPercent > 10) {
            percentRounded = 25;
        }
        iconColor = getBatteryPercentColor(batteryPercent);
        icon = SFSymbol.named(`battery.${ percentRounded }`);
    }
    return { batteryIcon: icon, batteryIconColor: iconColor };
}

function getLocationPinIcon() {
    let icon = SFSymbol.named("mappin.and.ellipse");
    let iconColor = DARK_MODE ? Color.white() : Color.black();

    return { locationPinIcon: icon, locationPinIconColor: iconColor };
}

// Create Widget
async function createWidget(batteryData: null, odometerData: null, vehicleInfo: null) {
    const BATTERY_PERCENTAGE = 75;
    const ODOMETER_IN_MILES = 5300;
    const IS_CHARGING = false;
    // const RANGE_IN_MILES = 180;
    const LAST_ONLINE_DATE_TIME = new Date().setHours(-4);  // TEMP

    const HYUNDAI_ICON = await loadImage(DARK_MODE ? HYUNDAI_ICON_DARK : HYUNDAI_ICON_LIGHT);
    const VEHICLE_NAME = `IONIQ 5`;

    const WIDGET = new ListWidget();
    WIDGET.url = 'hyundai-usa://';  // WIP - Don't know if this is to open app??
    const MAIN_STACK = WIDGET.addStack();
    MAIN_STACK.layoutVertically();

    // Background Color
    WIDGET.backgroundColor = DARK_MODE ? new Color(DARK_BG_COLOR) : new Color(LIGHT_BG_COLOR);

    // Top Row - Vehicle Name & Hyundai Icon
    MAIN_STACK.addSpacer();
    const TITLE_STACK = MAIN_STACK.addStack();
    const TITLE_ELEMENT = TITLE_STACK.addText(VEHICLE_NAME);
    TITLE_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    TITLE_ELEMENT.textOpacity = 0.7;
    TITLE_ELEMENT.font = Font.mediumSystemFont(22);
    TITLE_STACK.addSpacer();
    const ICON_ELEMENT = TITLE_STACK.addImage(HYUNDAI_ICON);
    ICON_ELEMENT.imageSize = new Size(35, 35);
    MAIN_STACK.addSpacer();

    // Center Row
    const CONTENT_STACK = MAIN_STACK.addStack();
    // Vehicle Image
    const CAR_IMAGE = await loadImage(HYUNDAI_IONIQ_5);
    const CAR_IMAGE_ELEMENT = CONTENT_STACK.addImage(CAR_IMAGE);
    CAR_IMAGE_ELEMENT.imageSize = new Size(175, 90);
    CONTENT_STACK.addSpacer();
    // Battery Stack
    const BATTERY_INFO_STACK = CONTENT_STACK.addStack();
    BATTERY_INFO_STACK.layoutVertically();
    BATTERY_INFO_STACK.addSpacer();
    // Range
    /**const RANGE_STACK = BATTERY_INFO_STACK.addStack();
    RANGE_STACK.addSpacer();
    const RANGE_TEXT = `${ RANGE_IN_MILES } mi`;
    const RANGE_ELEMENT = RANGE_STACK.addText(RANGE_TEXT);
    RANGE_ELEMENT.font = Font.mediumSystemFont(14);
    RANGE_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    RANGE_ELEMENT.rightAlignText();
    BATTERY_INFO_STACK.addSpacer();*/
    // Battery Percent
    const BATTERY_PERCENTAGE_STACK = BATTERY_INFO_STACK.addStack();
    BATTERY_PERCENTAGE_STACK.addSpacer();
    BATTERY_PERCENTAGE_STACK.centerAlignContent();
    const { batteryIcon, batteryIconColor } = getBatteryIcon(BATTERY_PERCENTAGE, false, IS_CHARGING, false);
    const BATTERY_SYMBOL_ELEMENT = BATTERY_PERCENTAGE_STACK.addImage(batteryIcon.image);
    BATTERY_SYMBOL_ELEMENT.imageSize = new Size(35, 35);
    BATTERY_SYMBOL_ELEMENT.tintColor = batteryIconColor;
    BATTERY_PERCENTAGE_STACK.addSpacer(8);
    // Battery Text
    const BATTERY_PERCENTAGE_TEXT = BATTERY_PERCENTAGE_STACK.addText(`${ BATTERY_PERCENTAGE }%`);
    BATTERY_PERCENTAGE_TEXT.textColor = getBatteryPercentColor(BATTERY_PERCENTAGE);
    BATTERY_PERCENTAGE_TEXT.font = Font.boldSystemFont(22);
    // Charging State (? Maybe remove ?)
    BATTERY_INFO_STACK.addSpacer();
    // Location
    const LOCATION_STACK = BATTERY_INFO_STACK.addStack();
    LOCATION_STACK.addSpacer();
    LOCATION_STACK.centerAlignContent();
    // Location Pin Icon
    const { locationPinIcon, locationPinIconColor } = getLocationPinIcon();
    const LOCATION_PIN_SYMBOL_ELEMENT = LOCATION_STACK.addImage(locationPinIcon.image);
    LOCATION_PIN_SYMBOL_ELEMENT.imageSize = new Size(15, 15);
    LOCATION_PIN_SYMBOL_ELEMENT.tintColor = locationPinIconColor;
    LOCATION_STACK.addSpacer(8);
    // Location Text
    const LOCATION_TEXT = `Elk Grove, CA`;
    const LOCATION_ELEMENT = LOCATION_STACK.addText(LOCATION_TEXT);
    LOCATION_ELEMENT.font = Font.mediumSystemFont(14);
    LOCATION_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    LOCATION_ELEMENT.rightAlignText();
    BATTERY_INFO_STACK.addSpacer();

    // Footer
    const FOOTER_STACK = MAIN_STACK.addStack();
    // Odometer
    const ODOMETER_TEXT = `${ ODOMETER_IN_MILES.toLocaleString() } mi`;
    const ODOMETER_ELEMENT = FOOTER_STACK.addText(ODOMETER_TEXT);
    ODOMETER_ELEMENT.font = Font.mediumSystemFont(12);
    ODOMETER_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    ODOMETER_ELEMENT.textOpacity = 0.5;
    ODOMETER_ELEMENT.minimumScaleFactor = 0.5;
    ODOMETER_ELEMENT.leftAlignText();
    FOOTER_STACK.addSpacer();
    // Last Active Time    LAST_ONLINE_DATE_TIME
    const LAST_SEEN_DATE = new Date(LAST_ONLINE_DATE_TIME);
    // const LAST_SEEN_TEXT = LAST_SEEN_DATE.toLocaleString(); // WIP - Change to just "last hour, or yesterday"
    const LAST_SEEN_ELEMENT = FOOTER_STACK.addDate(LAST_SEEN_DATE);
    LAST_SEEN_ELEMENT.font = Font.mediumSystemFont(10);
    LAST_SEEN_ELEMENT.textOpacity = 0.5;
    LAST_SEEN_ELEMENT.textColor = DARK_MODE ? Color.white() : Color.black();
    LAST_SEEN_ELEMENT.minimumScaleFactor = 0.5;
    LAST_SEEN_ELEMENT.rightAlignText();

    MAIN_STACK.addSpacer();

    return WIDGET;
}

// Setup Widget
const WIDGET = await createWidget(null, null, null);
if (config.runsInWidget) {
    Script.setWidget(WIDGET);
} else {
    WIDGET.presentMedium();
}

Script.complete();

export { };