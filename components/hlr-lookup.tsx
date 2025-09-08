"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Smartphone, AlertCircle, Navigation, Globe } from "lucide-react";

interface HLRResult {
  number: string;
  provider: string;
  location: string;
  description: string;
  latitude: string;
  longitude: string;
  isValid: boolean;
}

export default function HLRLookup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState<HLRResult | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration mismatch by ensuring component is mounted on client
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Cleanup function untuk mencegah memory leaks
  useEffect(() => {
    return () => {
      // Cleanup any pending timeouts
      setIsLoading(false);
    };
  }, []);

  // Reset error when phone number changes
  useEffect(() => {
    if (error) {
      setError("");
    }
  }, [phoneNumber, error]);

  // Simulasi data provider Indonesia dengan lokasi yang lebih detail
  const providerData: { [key: string]: { provider: string; location: string; description: string; latitude: string; longitude: string } } = {
    "0811": { provider: "Telkomsel", location: "Jakarta & Sekitarnya", description: "Kartu AS, Simpati, Loop", latitude: "-6.2088", longitude: "106.8456" },
    "0812": { provider: "Telkomsel", location: "Jakarta & Sekitarnya", description: "Kartu AS, Simpati, Loop", latitude: "-6.2088", longitude: "106.8456" },
    "0813": { provider: "Telkomsel", location: "Jakarta & Sekitarnya", description: "Kartu AS, Simpati, Loop", latitude: "-6.2088", longitude: "106.8456" },
    "0821": { provider: "Telkomsel", location: "Jawa Barat", description: "Kartu AS, Simpati, Loop", latitude: "-6.9175", longitude: "107.6191" },
    "0822": { provider: "Telkomsel", location: "Jawa Barat", description: "Kartu AS, Simpati, Loop", latitude: "-6.9175", longitude: "107.6191" },
    "0823": { provider: "Telkomsel", location: "Jawa Barat", description: "Kartu AS, Simpati, Loop", latitude: "-6.9175", longitude: "107.6191" },
    "0852": { provider: "Telkomsel", location: "Jawa Timur", description: "Kartu AS, Simpati, Loop", latitude: "-7.2504", longitude: "112.7688" },
    "0853": { provider: "Telkomsel", location: "Jawa Timur", description: "Kartu AS, Simpati, Loop", latitude: "-7.2504", longitude: "112.7688" },
    "0817": { provider: "XL", location: "Jakarta & Sekitarnya", description: "XL, Axis", latitude: "-6.2088", longitude: "106.8456" },
    "0818": { provider: "XL", location: "Jakarta & Sekitarnya", description: "XL, Axis", latitude: "-6.2088", longitude: "106.8456" },
    "0819": { provider: "XL", location: "Jakarta & Sekitarnya", description: "XL, Axis", latitude: "-6.2088", longitude: "106.8456" },
    "0859": { provider: "XL", location: "Jawa Tengah", description: "XL, Axis", latitude: "-7.7956", longitude: "110.3695" },
    "0877": { provider: "XL", location: "Jawa Tengah", description: "XL, Axis", latitude: "-7.7956", longitude: "110.3695" },
    "0878": { provider: "XL", location: "Jawa Tengah", description: "XL, Axis", latitude: "-7.7956", longitude: "110.3695" },
    "0814": { provider: "Indosat", location: "Jakarta & Sekitarnya", description: "IM3, Mentari, Tri", latitude: "-6.2088", longitude: "106.8456" },
    "0815": { provider: "Indosat", location: "Jakarta & Sekitarnya", description: "IM3, Mentari, Tri", latitude: "-6.2088", longitude: "106.8456" },
    "0816": { provider: "Indosat", location: "Jakarta & Sekitarnya", description: "IM3, Mentari, Tri", latitude: "-6.2088", longitude: "106.8456" },
    "0855": { provider: "Indosat", location: "Sumatera", description: "IM3, Mentari, Tri", latitude: "-0.7893", longitude: "113.9213" },
    "0856": { provider: "Indosat", location: "Sumatera", description: "IM3, Mentari, Tri", latitude: "-0.7893", longitude: "113.9213" },
    "0857": { provider: "Indosat", location: "Sumatera", description: "IM3, Mentari, Tri", latitude: "-0.7893", longitude: "113.9213" },
    "0858": { provider: "Indosat", location: "Sumatera", description: "IM3, Mentari, Tri", latitude: "-0.7893", longitude: "113.9213" },
    "0831": { provider: "Axis", location: "Jakarta & Sekitarnya", description: "Axis, XL", latitude: "-6.2088", longitude: "106.8456" },
    "0832": { provider: "Axis", location: "Jakarta & Sekitarnya", description: "Axis, XL", latitude: "-6.2088", longitude: "106.8456" },
    "0833": { provider: "Axis", location: "Jakarta & Sekitarnya", description: "Axis, XL", latitude: "-6.2088", longitude: "106.8456" },
    "0838": { provider: "Axis", location: "Kalimantan", description: "Axis, XL", latitude: "-0.0263", longitude: "109.3425" },
  };

  const normalizePhoneNumber = useCallback((input: string): string => {
    // Remove all non-digit characters except + at the beginning
    let cleaned = input.replace(/[^\d+]/g, "");
    
    // Remove + if present
    if (cleaned.startsWith("+")) {
      cleaned = cleaned.substring(1);
    }
    
    // Handle different formats
    if (cleaned.startsWith("62")) {
      cleaned = "0" + cleaned.substring(2);
    } else if (cleaned.startsWith("8")) {
      cleaned = "0" + cleaned;
    }
    
    return cleaned;
  }, []);

  const validatePhoneNumber = useCallback((number: string): boolean => {
    const cleaned = normalizePhoneNumber(number);
    return /^08\d{8,11}$/.test(cleaned);
  }, [normalizePhoneNumber]);

  const getProviderInfo = useCallback((number: string): { provider: string; location: string; description: string; latitude: string; longitude: string } => {
    const cleaned = normalizePhoneNumber(number);
    const prefix = cleaned.substring(0, 4);
    return providerData[prefix] || { provider: "Unknown", location: "Unknown", description: "Provider tidak dikenali", latitude: "0.0000", longitude: "0.0000" };
  }, [normalizePhoneNumber, providerData]);

  const handleSearch = useCallback(async () => {
    setError("");
    setResult(null);
    
    if (!phoneNumber.trim()) {
      setError("Masukkan nomor telepon terlebih dahulu");
      return;
    }

    const normalizedNumber = normalizePhoneNumber(phoneNumber);
    
    if (!validatePhoneNumber(normalizedNumber)) {
      setError("Format nomor telepon tidak valid. Gunakan format: 08xxxxxxxxx");
      return;
    }

    setIsLoading(true);
    
    // Simulasi delay API dengan ID yang konsisten
    const timeoutId = setTimeout(() => {
      const providerInfo = getProviderInfo(normalizedNumber);
      setResult({
        number: normalizedNumber,
        provider: providerInfo.provider,
        location: providerInfo.location,
        description: providerInfo.description,
        latitude: providerInfo.latitude,
        longitude: providerInfo.longitude,
        isValid: true,
      });
      setIsLoading(false);
    }, 1000);

    // Cleanup timeout on unmount
    return () => clearTimeout(timeoutId);
  }, [phoneNumber, normalizePhoneNumber, validatePhoneNumber, getProviderInfo]);

  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  }, [handleSearch]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(e.target.value);
  }, []);

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <section className="py-16 px-6 md:px-12 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Cari Nomor Telepon Indonesia
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Masukkan nomor HP untuk mengetahui lokasi dan provider. 
              Mendukung berbagai format: 08xxx, 62xxx, atau +62xxx
            </p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="animate-pulse">
              <div className="h-16 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-16 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-6 md:px-12 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Cari Nomor Telepon Indonesia
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Masukkan nomor HP untuk mengetahui lokasi dan provider. 
            Mendukung berbagai format: 08xxx, 62xxx, atau +62xxx
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-md mx-auto mb-8">
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                placeholder="Contoh: 0812xxxxxxx atau +628123-456-789"
                value={phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="rounded-full border-gray-300 shadow-sm px-6 py-4 text-center text-xl h-16"
              />
            </div>
            <Button
              onClick={handleSearch}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6 py-4 h-16 text-xl font-medium"
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Mencari...
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Search className="w-5 h-5" />
                  Cari Nomor
                </div>
              )}
            </Button>
          </div>
        </div>

        {/* Example Numbers */}
        <div className="max-w-md mx-auto mb-8">
          <div className="bg-white rounded-lg p-4 shadow-sm border">
            <h4 className="font-medium text-gray-900 mb-3 text-center">Contoh Nomor yang Bisa Dicari</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-mono text-blue-600">08123456789</div>
                <div className="text-gray-500">Telkomsel</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-mono text-blue-600">+628123-456-789</div>
                <div className="text-gray-500">WhatsApp Format</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-mono text-blue-600">08151234567</div>
                <div className="text-gray-500">Indosat</div>
              </div>
              <div className="text-center p-2 bg-gray-50 rounded">
                <div className="font-mono text-blue-600">628311234567</div>
                <div className="text-gray-500">International</div>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-md mx-auto mb-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="max-w-md mx-auto">
            <Card className="bg-white shadow-lg rounded-2xl border-0 animate-fade-in">
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="mb-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Hasil Pencarian
                    </h3>
                    <div className="text-2xl font-bold text-blue-600 mb-4">
                      {result.number}
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <Smartphone className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="text-sm text-gray-500">Provider</p>
                        <p className="font-medium text-gray-900">{result.provider}</p>
                        <p className="text-xs text-gray-400">{result.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <MapPin className="w-5 h-5 text-gray-600" />
                      <div className="text-left">
                        <p className="text-sm text-gray-500">Lokasi</p>
                        <p className="font-medium text-gray-900">{result.location}</p>
                        <p className="text-xs text-gray-400">Wilayah cakupan utama</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Navigation className="w-4 h-4 text-gray-600" />
                        <div className="text-left">
                          <p className="text-xs text-gray-500">Latitude</p>
                          <p className="font-mono text-sm text-gray-900">{result.latitude}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <Globe className="w-4 h-4 text-gray-600" />
                        <div className="text-left">
                          <p className="text-xs text-gray-500">Longitude</p>
                          <p className="font-mono text-sm text-gray-900">{result.longitude}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Badge 
                      variant={result.isValid ? "default" : "destructive"}
                      className="bg-green-100 text-green-800 hover:bg-green-100"
                    >
                      {result.isValid ? "Nomor Valid" : "Nomor Tidak Valid"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-12 space-y-6">
          <div className="bg-white rounded-lg p-6 shadow-sm border">
            <h4 className="font-medium text-gray-900 mb-3">Format Nomor yang Didukung</h4>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-600 mb-4">
              <Badge variant="outline">08xxxxxxxxx</Badge>
              <Badge variant="outline">62xxxxxxxxx</Badge>
              <Badge variant="outline">+62xxxxxxxxx</Badge>
              <Badge variant="outline">+628123-456-789</Badge>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Sistem akan otomatis mengenali dan menormalkan format nomor yang Anda masukkan, 
              termasuk format dari WhatsApp dengan tanda hubung
            </p>
          </div>

          <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
            <h4 className="font-medium text-blue-900 mb-3">Tentang HLR Lookup Indonesia</h4>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                <strong>HLR (Home Location Register)</strong> adalah database yang menyimpan informasi 
                tentang nomor telepon seluler, termasuk provider dan lokasi registrasi.
              </p>
              <p>
                Informasi yang ditampilkan meliputi:
              </p>
              <ul className="list-disc list-inside ml-4 space-y-1">
                <li>Nama provider (Telkomsel, XL, Indosat, Axis)</li>
                <li>Jenis kartu (AS, Simpati, IM3, Mentari, dll)</li>
                <li>Wilayah cakupan utama</li>
                <li>Koordinat geografis (Latitude & Longitude)</li>
                <li>Status validitas nomor</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
