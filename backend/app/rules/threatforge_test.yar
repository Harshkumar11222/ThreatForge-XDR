
rule ThreatForge_Test_Marker
{
    meta:
        description = "Synthetic ThreatForge validation marker"
        purpose = "Testing YARA integration only"

    strings:
        $marker = "THREATFORGE_YARA_TEST_MARKER_2026" ascii

    condition:
        $marker
}
