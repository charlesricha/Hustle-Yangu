export interface County {
    id: string; // 001 to 047
    name: string;
    lat: number;
    lng: number;
    path?: string;
    cx?: number;
    cy?: number;
}

export const counties: County[] = [
    { id: "001", name: "Mombasa", lat: -4.0435, lng: 39.6682 },
    { id: "002", name: "Kwale", lat: -4.1738, lng: 39.4521 },
    { id: "003", name: "Kilifi", lat: -3.6307, lng: 39.8499 },
    { id: "004", name: "Tana River", lat: -1.5036, lng: 39.6997 },
    { id: "005", name: "Lamu", lat: -2.2696, lng: 40.9006 },
    { id: "006", name: "Taita Taveta", lat: -3.3161, lng: 38.4850 },
    { id: "007", name: "Garissa", lat: -0.4532, lng: 39.6461 },
    { id: "008", name: "Wajir", lat: 1.7471, lng: 40.0573 },
    { id: "009", name: "Mandera", lat: 3.9373, lng: 41.8569 },
    { id: "010", name: "Marsabit", lat: 2.3337, lng: 37.9899 },
    { id: "011", name: "Isiolo", lat: 0.3546, lng: 37.5822 },
    { id: "012", name: "Meru", lat: 0.0463, lng: 37.6559 },
    { id: "013", name: "Tharaka-Nithi", lat: -0.2965, lng: 37.8741 },
    { id: "014", name: "Embu", lat: -0.5385, lng: 37.4582 },
    { id: "015", name: "Kitui", lat: -1.3756, lng: 37.9952 },
    { id: "016", name: "Machakos", lat: -1.5177, lng: 37.2634 },
    { id: "017", name: "Makueni", lat: -1.8041, lng: 37.6203 },
    { id: "018", name: "Nyandarua", lat: -0.1806, lng: 36.3719 },
    { id: "019", name: "Nyeri", lat: -0.4167, lng: 36.9500 },
    { id: "020", name: "Kirinyaga", lat: -0.4989, lng: 37.3325 },
    { id: "021", name: "Murang'a", lat: -0.7167, lng: 37.1500 },
    { id: "022", name: "Kiambu", lat: -1.1667, lng: 36.8333 },
    { id: "023", name: "Turkana", lat: 3.1167, lng: 35.6000 },
    { id: "024", name: "West Pokot", lat: 1.2359, lng: 35.1181 },
    { id: "025", name: "Samburu", lat: 1.2589, lng: 36.6875 },
    { id: "026", name: "Trans Nzoia", lat: 1.0150, lng: 35.0031 },
    { id: "027", name: "Uasin Gishu", lat: 0.5143, lng: 35.2698 },
    { id: "028", name: "Elgeyo Marakwet", lat: 0.6720, lng: 35.5181 },
    { id: "029", name: "Nandi", lat: 0.1764, lng: 35.0935 },
    { id: "030", name: "Baringo", lat: 0.5052, lng: 35.7507 },
    { id: "031", name: "Laikipia", lat: 0.0135, lng: 37.0735 },
    { id: "032", name: "Nakuru", lat: -0.3031, lng: 36.0800 },
    { id: "033", name: "Narok", lat: -1.0841, lng: 35.8679 },
    { id: "034", name: "Kajiado", lat: -2.0981, lng: 36.7820 },
    { id: "035", name: "Kericho", lat: -0.3692, lng: 35.2839 },
    { id: "036", name: "Bomet", lat: -0.7937, lng: 35.3421 },
    { id: "037", name: "Kakamega", lat: 0.2827, lng: 34.7519 },
    { id: "038", name: "Vihiga", lat: 0.0800, lng: 34.7236 },
    { id: "039", name: "Bungoma", lat: 0.5695, lng: 34.5584 },
    { id: "040", name: "Busia", lat: 0.4608, lng: 34.1115 },
    { id: "041", name: "Siaya", lat: -0.0607, lng: 34.2422 },
    { id: "042", name: "Kisumu", lat: -0.0917, lng: 34.7680 },
    { id: "043", name: "Homa Bay", lat: -0.6865, lng: 34.4609 },
    { id: "044", name: "Migori", lat: -1.0634, lng: 34.4731 },
    { id: "045", name: "Kisii", lat: -0.6773, lng: 34.7800 },
    { id: "046", name: "Nyamira", lat: -0.5639, lng: 34.9357 },
    { id: "047", name: "Nairobi", lat: -1.2921, lng: 36.8219 }
];
