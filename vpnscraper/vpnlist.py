""" vpnlist holds the list of all vpn names and accessors for the list
TODO: handle mentions of multiple products in one string
TODO: search for a term in comment body is potentially long for a long term list
"""

class VPNList(object):
    """ static list of VPNs and membership methods """
    VPN_LIST = {
        'ipvanish' : ['ipvanish'],
        'nordvpn' : ['nord vpn', 'nordvpn'],
        'purevpn' : ['purevpn', 'pure vpn'],
        'pia' : ['pia', 'private internet access'],
        'hide my ass' : ['hide my ass', 'hma'],
        'vypr vpn': ['vyprvpn', 'vypr vpn', 'golden frog'],
        'hotspot shield': ['hotspot shield'],
        'torguard': ['torguard'],
        'expressvpn': ['express vpn', 'expressvpn'],
        'vpnarea': ['vpnarea', 'vpn area'],
        'airvpn': ['airvpn', 'air vpn'],
        'cryptostorm': ['cryptostorm', 'crypto storm'],
        'frootvpn': ['froot vpn', 'frootvpn'],
        'hideme': ['hideme'],
        'ivpn': ['ivpn'],
        'mullvad': ['mullvad'],
        'ovpn': ['ovpn'],
        'perfect privacy': ['perfect privacy'],
        'proxy.sh': ['proxy.sh'],
        'earth vpn': ['earth vpn', 'earthvpn'],
        'buffered vpn': ['buffered vpn'],
        'vpnarea': ['vpnarea', 'vpn area'],
        'windscribe': ['windscribe'],
        'zenmate': ['zenmate'],
        'opera vpn': ['opera vpn'],
        'hola vpn': ['hola vpn'],
    }

    def __init__(self):
        # init flat list
        self.vpn_names_flat = [term for vpn in self.VPN_LIST
                               for term in self.VPN_LIST[vpn]]

    def _search_vpn(self, name):
        """
        search for VPN name variant and return normalized VPN name or empty str
        """
        for vpn in self.VPN_LIST:
            if name in self.VPN_LIST[vpn]:
                return vpn
        return ""

    def is_vpn_name(self, name):
        """
        returns true iff s is in VPN_LIST
        """
        vpn = self._search_vpn(name)
        if vpn == '':
            return False
        return True

    def normalize_vpn_name(self, name):
        """
        returns standard VPN name for a VPN name variant or ""
        """
        return self._search_vpn(name)

    def find_vpn_in_body(self, body):
        """
        search for any vpn mention in a long string (i.e. comment body)
        return vpn name or ""
        """
        for vpn in self.VPN_LIST:
            for term in self.VPN_LIST[vpn]:
                if term in body:
                    return vpn
        return ""
